import {spawnSync} from 'child_process';

export default function syncPostHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  var s3_bucket = process.env.S3_BUCKET_NAME;

  if (s3_bucket) {
    var syncResult = spawnSync('aws', ['s3', 'ls', '']);
    response.send(syncResult.stdout.toString());
  } else {
    response.send({
      path: '/sync',
      method: 'POST',
      body: 'S3_BUCKET_NAME is not set'
    });
  }
}
