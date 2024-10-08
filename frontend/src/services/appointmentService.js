const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const create = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/appointments`, {
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

export const checkAvailability = async (formData) => {
  const response = await fetch(
    `${BASE_URL}/api/appointments/check-availability`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const getAppointmentsByUserId = async (userId) => {
  const appendQuery = `?userId=${userId}`;
  const response = await fetch(`${BASE_URL}/api/appointments${appendQuery}`, {
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

export const getAppointmentsByDoctorId = async (doctorId) => {
  const appendQuery = `?doctorId=${doctorId}`;
  const response = await fetch(`${BASE_URL}/api/appointments${appendQuery}`, {
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

export const editAppointment = async (appointmentId, formData) => {
  const response = await fetch(
    `${BASE_URL}/api/appointments/${appointmentId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const deleteAppointment = async (appointmentId) => {
  const response = await fetch(
    `${BASE_URL}/api/appointments/${appointmentId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
