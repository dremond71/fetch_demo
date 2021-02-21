/**
 * https://learnwithparam.com/blog/how-to-handle-fetch-errors/
 *
 * https://javascript.info/fetch
 *
 * https://httpstatuses.com/
 *
 */

/**
 * Using fetch with a simple GET operation.
 * Get is the default, so you don't need to specify anything
 */
async function performGETWithNoHeaders() {
  const url = 'http://localhost:8081/listUsers';

  console.log(`calling url: ${url}`);
  const response = await fetch(url);

  if (response.status >= 200 && response.status <= 299) {
    const jsonResponse = await response.json();
    // turn the data into a string
    const responseAsString = JSON.stringify(jsonResponse, null, 2);

    console.log(`The response: ${responseAsString}`);

    document.getElementById('response1').innerHTML = responseAsString;
  } else {
    // Handle errors
    const errorMessage = `${response.status} ${response.statusText}`;
    console.log(`An error occurred => ${errorMessage}`);
    document.getElementById('response1').innerHTML = errorMessage;
  }
}

/**
 * Using fetch with a simple GET operation.
 * Get is the default, so you don't need to specify anything
 */
async function performGETWithNoHeaders_404_error() {
  // this url does not exist
  const url = 'http://localhost:8081/doesNotExist';

  console.log(`calling url: ${url}`);
  const response = await fetch(url);

  if (response.status >= 200 && response.status <= 299) {
    const jsonResponse = await response.json();
    // turn the data into a string
    const responseAsString = JSON.stringify(jsonResponse, null, 2);

    console.log(`The response: ${responseAsString}`);

    document.getElementById('response2').innerHTML = responseAsString;
  } else {
    // Handle errors
    const errorMessage = `${response.status} ${response.statusText}`;
    console.log(`An error occurred => ${errorMessage}`);
    document.getElementById('response2').innerHTML = errorMessage;
  }
}

async function performPOSTWithHeadersAndJSONBody() {
  let user = {
    name: `user_${Date.now()}`,
    password: `password_${Date.now()}`,
    profession: `profession__${Date.now()}`,
    id: Date.now(),
  };

  // the url
  const url = 'http://localhost:8081/user';
  // extra arguments you can pass to fetch:
  // - the method: POST
  // - some headers
  // - the input data (aka body)
  const argumentsForFetch = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  };

  console.log(
    `calling url: ${url} with arguments ${JSON.stringify(
      argumentsForFetch,
      null,
      2
    )}`
  );
  const response = await fetch(url, argumentsForFetch);

  if (response.status >= 200 && response.status <= 299) {
    // in this case, we get a `201 Created`, so there is
    // no JSON data returned. (See server.js for details)

    // so....no need to do this:
    ///////const jsonResponse = await response.json();
    ///////const responseAsString = JSON.stringify(jsonResponse,null,2);

    // when you stop the debugger in browser, you can see that
    // response object above has: status and statusText fields

    const successMessage = `${response.status} ${response.statusText}`;
    console.log(`The response: ${successMessage}`);

    document.getElementById('response3').innerHTML = successMessage;
  } else {
    // Handle errors
    const errorMessage = `${response.status} ${response.statusText}`;
    console.log(`An error occurred => ${errorMessage}`);
    document.getElementById('response3').innerHTML = errorMessage;
  }
}

async function performPOSTWithHeadersAndJSONBody_With_Error() {
  let user = {
    name: `user_${Date.now()}`,
    password: `password_${Date.now()}`,
    profession: `profession__${Date.now()}`,
    id: Date.now(),
  };

  // the url
  const url = 'http://localhost:8081/user';
  // extra arguments you can pass to fetch:
  // - the method: POST
  // - some headers
  // - the input data (aka body)

  // CAUSE OF THE ERROR:
  // in this case, I am not performing JSON.stringify(user) for 'body:'
  const argumentsForFetch = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: user,
  };

  console.log(
    `calling url: ${url} with arguments ${JSON.stringify(
      argumentsForFetch,
      null,
      2
    )}`
  );
  const response = await fetch(url, argumentsForFetch);

  if (response.status >= 200 && response.status <= 299) {
    // in this case, we get a `201 Created`, so there is
    // no JSON data returned. (See server.js for details)

    // so....no need to do this:
    ///////const jsonResponse = await response.json();
    ///////const responseAsString = JSON.stringify(jsonResponse,null,2);

    // when you stop the debugger in browser, you can see that
    // response object above has: status and statusText fields

    const successMessage = `${response.status} ${response.statusText}`;
    console.log(`The response: ${successMessage}`);

    document.getElementById('response4').innerHTML = successMessage;
  } else {
    // Handle errors
    const extraInfo = `server.js will throw this error: 'SyntaxError: Unexpected token o in JSON at position 1
       at JSON.parse (<anonymous>)'`;
    const errorMessage = `${response.status} ${response.statusText}\n${extraInfo}`;
    console.log(`An error occurred => ${errorMessage}`);
    document.getElementById('response4').innerHTML = errorMessage;
  }
}
