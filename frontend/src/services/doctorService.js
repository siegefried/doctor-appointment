const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const create = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/doctors`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const getDoctors = async () => {
  const response = await fetch(`${BASE_URL}/api/doctors`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const getDoctorById = async (doctorId) => {
  const response = await fetch(`${BASE_URL}/api/doctors/${doctorId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }); 
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const getDoctorByUserId = async (userId) => {
  const appendQuery = `?userId=${userId}`;
  const response = await fetch(`${BASE_URL}/api/doctors${appendQuery}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
