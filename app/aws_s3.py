
import boto3
import botocore
from .config import Config

from random import randint
from random import seed


s3 = boto3.client(
   "s3",
   aws_access_key_id=Config.S3_KEY,
   aws_secret_access_key=Config.S3_SECRET
)

def upload_file_to_s3(file, bucket_name, acl="public-read"):

    try:
        seed(5)
        myRandom = randint(0, 1000000)

        s3.upload_fileobj(
            file,
            bucket_name,
            f"{file.filename}-{myRandom}",
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e


    return f"{Config.S3_LOCATION}{file.filename}-{myRandom}"
