import { InfluxDB, Point } from '@influxdata/influxdb-client';

const token = process.env.INFLUXDB_TOKEN;
const org = 'iot'; // todo - changeme
const bucket = 'stems';

const client = new InfluxDB({
  url: process.env.INFLUXDB_URL ?? '', 
  token: token
});

type InfluxFieldType = 'number';

// example usage:
//   writeToInflux('mem', 'used_percent', 1.234);
export const writeToInflux = async (measurement: string, field: string, val: any, type_?: InfluxFieldType) => {
  const writeApi = client.getWriteApi(org, bucket);
  writeApi.useDefaultTags({ env: process.env.NODE_ENV });
  
  // todo - handle non-numeric types?
  const point = new Point(measurement).floatField(field, val);

  writeApi.writePoint(point);
  await writeApi.close();

  console.log(`influxdb:write - ${measurement} => ${field}=${val}`)
}

