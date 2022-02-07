from flask import Flask, jsonify, request, send_file
import nexradaws
from flasgger import Swagger, swag_from
from ingestor import save_file

# pylint: disable=unused-argument
def create_app(test_config=None):

    conn = nexradaws.NexradAwsInterface()

    app = Flask(__name__)

    template = {
      "swagger": "2.0",
      "info": {
        "title": "Ingestor API",
        "description": "Endpoints available with Ingestor",
        "contact": {
          "responsibleOrganization": "dexlab",
          "responsibleDeveloper": "Shubham Thakur",
          "email": "sdthakur@iu.edu",
          "url": "https://github.com/airavata-courses/dexlab/tree/ingestor",
        },
        "version": "0.0.1"
      }
    }

    Swagger(app, template=template)

    def split_date(date):
        date = date.split('-')
        return date[0], date[1], date[2]

    @app.route('/radars', methods=["POST"])
    @swag_from('radar.yml')
    def get_radars():

        """
        radar_list = ['1','2']
        response = {
                'radars': radar_list
        }
        return jsonify(response)
        """

        body = request.get_json(force=True)
        try:
            date = body['date']
            year, month, day = split_date(date)
        except KeyError:
            return "date key must be present", 400

        radar_list = conn.get_avail_radars(year, month, day)

        response = {
                'radars': radar_list
        }

        return jsonify(response)

    @app.route('/plot', methods=['POST'])
    @swag_from('plot.yml')
    def get_plot():
        body = request.get_json(force=True)

        try:
            date = body['date']
            year, month, day = split_date(date)
            radar = body['radar']
        except KeyError:
            return "date and radar must be part of the body", 400

        file = save_file(conn, year, month, day, radar)
        return send_file(file, as_attachment=False)

    return app
