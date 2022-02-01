import pyart
from matplotlib import pyplot as plt
import nexradaws
from datetime import datetime

conn = nexradaws.NexradAwsInterface()

availscans = conn.get_avail_scans('2021', '05', '31', 'KTLX')
print("There are {} NEXRAD files available for May 31st, 2021 for the KTLX radar.\n".format(len(availscans)))
#print(availscans[0:4])
considered_scans = []
considered_scans.append(availscans[0])
considered_scans.append(availscans[89])
considered_scans.append(availscans[178])
considered_scans.append(availscans[326])
res = conn.download(considered_scans, './')
#res = conn.download(availscans, './')

print(res.success)

fig = plt.figure(figsize=(16,12))
for i,scan in enumerate(res.iter_success(),start=1):

    #print(f"{scan.radar_id} {scan.scan_time}")
    #continue

    ax = fig.add_subplot(2,2,i)
    radar = scan.open_pyart()
    display = pyart.graph.RadarDisplay(radar)
    display.plot('reflectivity', 0, title=f"{scan.radar_id} {scan.scan_time}",
                vmin=-32, vmax=64, colorbar_label='', ax=ax)
    display.plot_range_ring(radar.range['data'][-1]/1000., ax=ax)
    display.set_limits(xlim=(-500, 500), ylim=(-500, 500), ax=ax)

plt.savefig('p.png')



