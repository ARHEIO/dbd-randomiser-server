#!/bin/bash

# lambdaName=${PWD##*/}

# rm index.zip
# cd dist
# zip -X -r ../index.zip *
# cd ..
serverless deploy --aws-profile arheio
# aws lambda update-function-code --region ap-southeast-2 --function-name $lambdaName --zip-file fileb://index.zip
# rm index.zip

const cleanSqlFile = async () => new Promise((resolve, reject) => {
  fs.access('./15_add_partners.sql', fs.constants.F_OK, error => {
    if (error) {
      resolve()
    } else {
      fs.unlink('./15_add_partners.sql', (err) => resolve())
    }
  });
})

cleanSqlFile().then(() => {
  partners.forEach( async(partner) => {
    await createSqlFile(partner);
  });
});