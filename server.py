from flask import Flask, jsonify, request, send_file
import nexradaws
from ingestor import save_file, get_scans

conn = nexradaws.NexradAwsInterface()

app = Flask(__name__)

def split_date(date):
    date = date.split('-')
    return date[0], date[1], date[2]

@app.route('/radars', methods=["POST"])
def get_radars():
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

@app.route('/plot', methods=['GET', 'POST'])
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

if __name__ == "__main__":
    app.run(host="0.0.0.0")
