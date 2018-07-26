# Development Setup

* Install postgres (on Mac you can use Postgres.app)
* Install npm and node.js (https://nodejs.org/en/)
* Install yarn: https://yarnpkg.com/en/
* Install asdf version manager: https://github.com/asdf-vm/asdf
* Install asdf nodejs plugin: https://github.com/asdf-vm/asdf-nodejs

Run these commands:

    asdf install
    npm install -g knex
    yarn install
    createdb power_ballot_development
    knex migrate:latest
    # Note: these scripts hang after they are done working
    node server/insert_polling_places.js

# Running in development

    npm start

Visit http://localhost:3000

Note: `npm start` starts the node server on port 4000 and the webpack dev server
on port 3000. The webpack dev server forwards requests to the node server.

# Production Deploys

To deploy code updates just push an update to the `production` branch on github

Deploy database:

    heroku pg:push power_ballot_development DATABASE_URL --app power-ballot

# Exporting data to volunteer seed CSV

In postgres shell (psql) run the following:

    \COPY (select c."Candidate_Name" as candidate_name, c."Candidate_Party" as party, cm.cand_website_url as cand_website_url, cm.cand_facebook_url as cand_facebook_url, cm.cand_twitter_url as cand_twitter_url, cm.cand_email as cand_email_address, cm."CC_Reg_No" as cc_registration_number, cm."FEC_CC_ID" as fec_cc_id, cm.cb_website_url as civil_beat_url, cm.lwv_website_url as lwv_url, cm.staradvertiser_url as staradvertiser_url, cm.photo_url as candidate_photo_url from candidates c join candidate_metadata cm on cm."Candidate_ID" = c."Candidate_ID") TO 'volunteer_seed.csv' DELIMITER ',' CSV HEADER;

Then modify the seed file to have absolute references to the locally hosted kanu files by opening the csv and running this command in vim:

    %s/\/assets\/kanu/http:\/\/www.hawaiipowerballot.com\/assets\/kanu/g

# Importing new Volunteer data

In shell:

    node server/scripts/csv/update_candidates.js < data/2018-data-from-volunteers-2018-07-16.csv

For production (probably) run as:

    heroku run node server/scripts/csv/update_candidates.js
    
When you import new data make sure that both the `contests` and the `contest_id` field is properly filled out!

# ArcGIS Services

http://civic-celerator.maps.arcgis.com/home/item.html?id=835932a4c56742db9f25ecc8dfba5cc9
