##-------------------------------------------------------
##-------------------------------------------------------
# this script was written by @ndcartography, 10/2017
#
# designed to assign an id to each feature used in to HSU interactive web map
# adds a new property called `id` to each distinct spatial feature or updates an existing id field that is null
# NOT recommended if features already are ID'd i.e this should be used when adding a brand new feature to the HSU web map
##----------------------------------
# For desired use, run in termanal:

 '''python ~/HSUWebMap/py/feature.py'''

##-------------------------------------------------------
##-------------------------------------------------------

#!/usr/bin/env python

# -*- coding: utf-8 -*-

import time
import sys
import logging
import os.path
import csv
import pprint
import geojson
import json

# set up logging
logging.basicConfig(level=logging.INFO)

logging.info("\t Starting script...")

# File paths for data (Be sure to uncomment inpath for correct file)
inpath = os.path.expanduser("~/HSUTibet/data/2000.geojson")


outpath = os.path.expanduser("~/HSUTibet/data/2000.geojson")

# File path to id sheet
#id_sheet = os.path.expanduser("~/HSUWebMap/id_sheet.csv")
#temp = os.path.expanduser("~/HSUWebMap/temp_id_sheet.csv")

#---------------------------------------------------------#
#                         MAIN SCRIPT
#---------------------------------------------------------#

fresh_id_list = []
used_id_list = []
name_list = []

count = 0
id_count = 0


#---------------#
#  Step: 2
#
#  loads selected .js file and checks for ID property
#---------------#

fdata = open(inpath, 'r+')
data = json.load(fdata)

out = open(outpath, 'a')

for prop in data['crs']:
    props = crs['properties']
    if props.has_key('Name'):
        name = props['Name']
    elif props.has_key('NAME'):
        name = props['NAME']
    else:
        name = 'NULL'
    #print(feature)
    if not props.has_key("ID"):
        logging.info("\t\tDoes NOT have id property \t") 
        fresh_id = fresh_id_list[count]
        props['id'] = fresh_id
        used_id_list.append(fresh_id)
        name_list.append(name)
        logging.info("\tname: " + str(name) + "\tid: " + str(props['id']))
        count+=1

    else:
        null = None
        if props['ID'] == null:
            fresh_id = fresh_id_list[count]
            props['ID'] = str(fresh_id)
            used_id_list.append(fresh_id)
            name_list.append(name)
            logging.info("\tname: " + str(name) + "\tID: " + str(props['ID']))
            count+=1
        else:
            #logging.info("\tHas id property already: \t" + props['ID'])  
            pass

# writes results to existing .js file (comment this out during first run of this script)
geojson.dump(data,out)
os.remove(inpath)
os.rename(outpath, inpath)



    

