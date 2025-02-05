"use client";

import { useState, useEffect } from "react";

const BASE_URL = "https://6796457bbedc5d43a6c4c20e.mockapi.io/api/v1/profiles";

async function getProfile(slug) {
  const response = await fetch(`${BASE_URL}/${slug}`);

  if (!response.ok)
    throw new Error(`Failed to fetch profile: ${response.status}`);
  return response.json();
}
export default function Page({ params }) {
  const [profile, setProfileState] = useState({ name: "" });
  const [loading, setLoadingState] = useState(true);

  const initProfile = async () => {
    try {
      const { slug } = await params;
      const result = await getProfile(slug);

      setProfileState(result);
      setLoadingState(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    initProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/${profile.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!response.ok)
        throw new Error(`Failed to update profile: ${response.status}`);

      const responseData = await response.json();
      console.log("Form submit success", responseData);

      initProfile();
    } catch (error) {}
  };

  return (
    <>
      {loading && <div>Loading...</div>}

      {!loading && (
        <div>
          <div>ID: {profile.id}</div>
          <div>Email: {profile.email}</div>
          <div>Name: {profile.name}</div>
          <div>Gender: {profile.gender}</div>
          <div>Phone: {profile.phone}</div>
          <div>Edit</div>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="bg-black text-white p-2 rounded-md border border-white"
              value={profile.name}
              onChange={handleChange}
            ></input>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Edit
            </button>
          </form>
        </div>
      )}
    </>
  );
}
