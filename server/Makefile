install:
	python -m pip install --target ./build/ -r requirements.txt

archive:
	cp src/index.py build/

deploy:
	terraform apply

initdb:
	aws s3api put-object --bucket $(terraform output -raw recipe_bucket_name) --key recipes --body db/recipes.json

cleanup:
	aws s3 rm s3://$(terraform output -raw recipe_bucket_name) --recursive
	terraform destroy
