import boto3
import json
from urllib.parse import unquote_plus


def send_email(request_body):
    toEmail = "acts+groktw@sorenbjornstad.com"
    fromEmail = "notify@groktiddlywiki.sorenbjornstad.com"
    subject = "[Grok TW Feedback] " + request_body['tiddler']
    if request_body['email']:
        replyToAddresses = [request_body['email']]
    else:
        replyToAddresses = []
    message = (f"Feedback received on tiddler {request_body['tiddler']} from {request_body['email']}:\n"
               f"{request_body['comment']}\n\n"
               f"Debug information, if any:\n"
               f"{request_body['debug']}\n\n")
    if replyToAddresses:
        message += f"You may reply to this email to contact the original author."

    client = boto3.client('ses')
    response = client.send_email(
		Source = fromEmail,
		Destination = {
			'ToAddresses': [
				toEmail,
			],
		},
		Message = {
			'Subject': {
				'Data': subject,
				'Charset': 'utf8'
			},
			'Body': {
				'Text': {
					'Data': message,
					'Charset': 'utf8'
				}
			}
		},
		ReplyToAddresses = replyToAddresses
	)
    print(response['MessageId'])
    print(response)


def lambda_handler(event, context):
    print("Event: " + str(event))
    print("Context: " + str(context))
    
    parameters = event['body'].split('&')
    body = {}
    for p in parameters:
        name, value = p.split('=')
        body[name] = unquote_plus(value)
    print(body)
    send_email(body)
    

    result = {
        "status": "success"
    }
    return {
        'statusCode': 200,
        'headers': {
            #'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            #'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
        'body': json.dumps(result)
    }
