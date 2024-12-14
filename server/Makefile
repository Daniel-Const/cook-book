install:
	python -m pip install --target ./build/ -r src/requirements.txt

archive:
	cp src/index.py build/

deploy:
	echo "===== Creating archive file for lambda ====="
	make archive
	echo "===== Deploying terraform infrastructure ====="
	terraform apply

initdb:
	aws s3api put-object --bucket $(terraform output -raw recipe_bucket_name) --key recipes --body db/recipes.json

cleanup:
	terraform destroy
