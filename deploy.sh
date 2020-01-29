#!/usr/bin/env bash

read -p "Deploying the bot? Y/N" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; 
then
    if [ -f "bot_conciergeCroccante.zip" ]
    then
        rm -r bot_conciergeCroccante.zip
    fi
    zip -r bot_conciergeCroccante.zip . -x ".idea"
    # Per eliminare l'oggetto dal bucket
    # aws s3api delete-object --bucket amazon-s3-pellanda --key Skill.zip

    # Per caricare l'oggetto nel bucket
    aws s3api put-object --bucket amazon-s3-pellanda --key bot_conciergeCroccante.zip --body bot_conciergeCroccante.zip
    # Per linkare l'oggetto deploy alla lambda
    aws lambda update-function-code --function-name ConciergeCroccanteBotTest --s3-bucket amazon-s3-pellanda --s3-key bot_conciergeCroccante.zip
    rm -r bot_conciergeCroccante.zip
else
    echo "Project not deploy."
fi