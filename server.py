import nexradaws

from flask import Flask, jsonify, request, send_file

#conn = nexradaws.NexradAwsInterface()

app = Flask(__name__)

@app.route('/radars')
def get_radars():
    radar_list = conn.get_avail_radars('2021', '05', '21')
    print(radar_list)
    response = {
            'radars': radar_list
    }
    return jsonify(response)

@app.route('/plot', methods=['GET', 'POST'])
def get_plot():
    """
    body = request.get_json(force=True)
    response = {
            'success': True
    }
    return jsonify(response)
    """
    return send_file('./o.png', as_attachment=False)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
