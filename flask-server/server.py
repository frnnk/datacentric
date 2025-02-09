from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_pymongo import PyMongo, ObjectId
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from transformers import GPT2LMHeadModel, GPT2Tokenizer, pipeline
from processing import process_conversation

# flask config
app = Flask(__name__)
app.secret_key = 'some_secret_key'
CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)

# flask-login config
login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin):
    def __init__(self, doc):
        self.id = doc["_id"]
        self.email = doc["email"]

    @staticmethod
    def get(user_id):
        try:
            oid = ObjectId(user_id)
        except:
            return None
        
        user_doc = USERS_COLLECTION.find_one({"_id": oid})
        if not user_doc:
            return None
        return User(user_doc)

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)
        
# mongo config
app.config["MONGO_URI"] = "mongodb+srv://fr4nk:wHYrOCAPL9CoeKaG@datacentric.fn8kg.mongodb.net/datacentric?retryWrites=true&w=majority&appName=datacentric"
mongo = PyMongo(app)
TEST_COLLECTION = mongo.db.test
USERS_COLLECTION = mongo.db.users

# model config
MODEL_PATH = "./flask-server/run1"
model = GPT2LMHeadModel.from_pretrained(MODEL_PATH)
tokenizer = GPT2Tokenizer.from_pretrained(MODEL_PATH)
generator = pipeline(task="text-generation", model=model, tokenizer=tokenizer)

@app.route("/test")
@login_required
def test_mongo():
    document = TEST_COLLECTION.find_one()

    if document:
        document['_id'] = str(document['_id'])
        return jsonify(document)
    else:
        return jsonify({"message": "No data found in the collection"}), 404
    
@app.route("/api/conversations", methods=["POST", "PUT"])
def handle_conversations():
    if request.method == "POST":
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data received"}), 400
        
        processed_data = process_conversation(conversation_array=data["messages"])
        document = TEST_COLLECTION.insert_one(processed_data)
        return str(document.inserted_id)
    
    elif request.method == "PUT":
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data received"}), 400
        
        conversation_id = data["id"]
        processed_data = process_conversation(conversation_array=data["messages"])
        
        document = TEST_COLLECTION.update_one(
            {"_id": ObjectId(conversation_id)},
            {"$set": processed_data}
        )

        return "put recieved"


@app.route("/api/signup", methods=["POST"])
def handle_signup():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    existing_user = USERS_COLLECTION.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "User already exists"}), 400
    
    pw_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    document = USERS_COLLECTION.insert_one({
        "email": email,
        "hashed_password": pw_hash
    })

    logged_user = User({
        "_id": str(document.inserted_id),
        "email": email
    })
    login_user(logged_user)

    print("signup success")
    return jsonify({"user_id": str(document.inserted_id)}), 201


@app.route("/api/login", methods=["POST"])
def handle_login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    user = USERS_COLLECTION.find_one({"email": email})
    if user and bcrypt.check_password_hash(user["hashed_password"], password):
        logged_user = User(user)
        login_user(logged_user)
        print("success")
        return jsonify({
            'message': 'Logged in successfully',
            "user_id": user["_id"]
        }), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401


@app.route("/api/chat", methods=["POST"])
def handle_submission():
    data = request.get_data(as_text=True)
    prompt = f"<USER> {data} <BOT>"
    output = generator(
        prompt,
        max_length=200,
        num_return_sequences=1,
        temperature=1,
        top_k=50,
        top_p=0.9,
        do_sample=True
    )
    
    generated_text = output[0]["generated_text"]
    bot_response = generated_text.split("<BOT>")[-1].strip()
    return bot_response


if __name__ == "__main__":
    app.run(debug=True)