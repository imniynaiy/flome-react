async function client(method, endpoint,  body, ...customConfig) {
    const headers = { 'Content-Type': 'application/json' }
  
    const config = {
      method: method,
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    }
  
    if (body) {
      config.body = JSON.stringify(body)
    }
  
    let data
    try {
      const response = await window.fetch(endpoint, config)
      data = await response.json()
      if (response.ok) {
        // Return a result object similar to Axios
        return {
          status: response.status,
          data,
          headers: response.headers,
          url: response.url,
        }
      }
      throw new Error(response.statusText)
    } catch (err) {
      return Promise.reject(err.message ? err.message : data)
    }
  }

  export async function get(endpoint, ...customConfig) {
    return client('GET', endpoint, ...customConfig)
  }

  export async function post(endpoint, body, ...customConfig) {
    return client('POST', endpoint, body, ...customConfig)
  }

  export async function put(endpoint, body, ...customConfig) {
    return client('PUT', endpoint, body, ...customConfig)
  }

  export async function del(endpoint, ...customConfig) {
    return client('DELETE', endpoint, ...customConfig)
  }