export default function syncPostHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */

  let server = request.app.get('server');
  let res = server.processController.sync_s3();

  response.send(res);
}
