from datetime import date

def process_conversation(conversation_array):
    result = ""
    bot, user = " <BOT>", " <USER>"

    for message in conversation_array:
        if not message["right"]:
            tokened_message = f'{user} {message["content"]}'
        else:
            tokened_message = f'{bot} {message["content"]}'
        result += tokened_message

    return {
        "time": str(date.today()),
        "raw": conversation_array,
        "data_sample": result
    }

if __name__ == "__main__":
    # print(process_conversation(conversation_array=[]))
    pass