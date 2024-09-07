import boto3
import os
from uuid import uuid4
import json

bucketName = os.environ.get('recipe_store')
region = "ap-southeast-2"

def lambda_handler(event, context):
    client = boto3.client("s3", region)
    obj = client.get_object(
        Bucket=bucketName, Key="recipes"
    )

    return {
        'statusCode': 200,
        'body': obj['Body'].read().decode('utf-8')
    }


if __name__ == '__main__':
    lambda_handler(None, None)
