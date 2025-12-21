

// Client  →  API Gateway  →  Lambda (handler)  ↔  S3 (bucket for objects)


// GET /object?key=... → returns object from S3 (base64 when binary)

// PUT /object → writes JSON body to S3 with a key query param


const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET = process.env.BUCKET; // injected from SAM

exports.handler = async (event) => {
  try {
    const method = event.httpMethod || event.requestContext.http.method;
    const key = (event.queryStringParameters || {}).key;
    if (method === 'GET') {
      if (!key) return { statusCode: 400, body: "Missing ?key=" };
      const obj = await s3.getObject({ Bucket: BUCKET, Key: key }).promise();
      // return as text (assumes UTF-8). For binary, use isBase64Encoded true.
      return {
        statusCode: 200,
        headers: { "Content-Type": obj.ContentType || "application/octet-stream" },
        body: obj.Body.toString('utf8')
      };
      
    } else if (method === 'PUT') {
      if (!key) return { statusCode: 400, body: "Missing ?key=" };
      const body = event.body || "";
      await s3.putObject({
        Bucket: BUCKET,
        Key: key,
        Body: body,
        ContentType: "application/json"
      }).promise();
      
      return { statusCode: 201, body: `Wrote ${key}` };
    } else {
      
      return { statusCode: 405, body: "Method not allowed" };
    }
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: err.message || "error" };
  }
};



