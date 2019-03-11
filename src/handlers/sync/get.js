import RouteLogger from '../../routes/route_logger';
import config from '../../common/config';
import { join as joinPath, normalize as normalizePath, extname as pathExtension } from 'path';

let logger = new RouteLogger('/sync');

export default function syncGetHandler(request, response) {
  var s3_bucket = process.env.S3_BUCKET_NAME;
  var path = ""

  const ruleFolderSettings = config.get('rulesPath');
  if (ruleFolderSettings.relative) {
    path = joinPath(config.get('elastalertPath'), ruleFolderSettings.path);
  } else {
    path = ruleFolderSettings.path;
  }

  response.send({
      path: '/sync',
      method: 'GET',
      body: { 'bucket': s3_bucket, 'rule_path': path }
  });

  logger.sendSuccessful();
}
