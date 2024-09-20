type Error = {
  message: string;
  statusCode: string;
};

const customFetch = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem("access_token");
  const headers = options.headers as Record<string, string>;

  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);

  if (!response.ok) {
    const errorBody = await response.json();
    throw getRESTErrors(errorBody, response.status);
  }

  return response;
};

const getRESTErrors = (body: Record<string, any>, statusCode: number): Error => {
  if (!body) {
    return {
      message: "Unknown error",
      statusCode: "INTERNAL_SERVER_ERROR",
    };
  }

  const message = body.message || "An error occurred";

  return {
    message,
    statusCode: statusCode.toString(),
  };
};