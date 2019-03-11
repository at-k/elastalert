import {spawnSync} from 'child_process';
import config from '../../common/config';
import { join as joinPath, normalize as normalizePath, extname as pathExtension } from 'path';

export default function syncPostHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  var s3_bucket = process.env.S3_BUCKET_NAME;
  var path = ""

  const ruleFolderSettings = config.get('rulesPath');
  if (ruleFolderSettings.relative) {
    path = joinPath(config.get('elastalertPath'), ruleFolderSettings.path);
  } else {
    path = ruleFolderSettings.path;
  }

  if (s3_bucket) {
    var syncResult = spawnSync('aws', ['s3', 'sync', 's3://'+s3_bucket, path, '--delete']);
    response.send(syncResult.stdout.toString());
  } else {
    response.send({
      path: '/sync',
      method: 'POST',
      body: 'S3_BUCKET_NAME is not set'
    });
  }
}
