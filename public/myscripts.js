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

    document.getElementById('response1').value = responseAsString;
  } else {
    // Handle errors
    const errorMessage = `${response.status} ${response.statusText}`;
    console.log(`An error occurred => ${errorMessage}`);
    document.getElementById('response1').value = errorMessage;
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

    document.getElementById('response2').value = responseAsString;
  } else {
    // Handle errors
    const errorMessage = `${response.status} ${response.statusText}`;
    console.log(`An error occurred => ${errorMessage}`);
    document.getElementById('response2').value = errorMessage;
  }
}

async function performPOSTWithHeadersAndJSONBody() {
  let userDefaultInfo = {
    id: Date.now(),
  };

  let newUser = undefined;
  const textValue = document.getElementById('response3').value;
  try {
    newUser = JSON.parse(textValue);
  } catch (error) {
    alert('Invalid JSON');
    return;
  }

  let user = Object.assign({}, userDefaultInfo, newUser);
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
    const jsonResponse = await response.json();
    const responseAsString = JSON.stringify(jsonResponse, null, 2);
    console.log(responseAsString);

    // when you stop the debugger in browser, you can see that
    // response object above has: status and statusText fields

    const successMessage = `${response.status} ${response.statusText} : ${jsonResponse.message}`;
    console.log(`The response: ${successMessage}`);

    document.getElementById('response3').value = successMessage;
  } else {
    // Handle errors
    const errorMessage = `${response.status} ${response.statusText}`;
    console.log(`An error occurred => ${errorMessage}`);
    document.getElementById('response3').value = errorMessage;
  }
}

async function performPOSTWithHeadersAndJSONBody_With_Error() {
  let userDefaultInfo = {
    id: Date.now(),
  };

  let newUser = undefined;
  const textValue = document.getElementById('response4').value;
  try {
    newUser = JSON.parse(textValue);
  } catch (error) {
    alert('Invalid JSON');
    return;
  }

  let user = Object.assign({}, userDefaultInfo, newUser);

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
    const jsonResponse = await response.json();
    const responseAsString = JSON.stringify(jsonResponse, null, 2);
    console.log(responseAsString);

    // when you stop the debugger in browser, you can see that
    // response object above has: status and statusText fields

    const successMessage = `${response.status} ${response.statusText} : ${jsonResponse.message}`;
    console.log(`The response: ${successMessage}`);

    document.getElementById('response4').value = successMessage;
  } else {
    // Handle errors
    const extraInfo = `server.js will throw this error: 'SyntaxError: Unexpected token o in JSON at position 1
       at JSON.parse (<anonymous>)'`;
    const errorMessage = `${response.status} ${response.statusText}\n${extraInfo}`;
    console.log(`An error occurred => ${errorMessage}`);
    document.getElementById('response4').value = errorMessage;
  }
}
