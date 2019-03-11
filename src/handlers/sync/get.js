export default function syncGetHandler(request, response) {

  let server = request.app.get('server');
  let pc = server.processController;

  response.send({
      path: '/sync',
      method: 'GET',
      body: { 'bucket': pc._s3_bucket, 'rule_path': pc._rule_path }
  });
}
