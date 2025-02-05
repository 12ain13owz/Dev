const BASE_URL = "https://6796457bbedc5d43a6c4c20e.mockapi.io/api/v1/profiles";

async function getProfile(slug) {
  const response = await fetch(`${BASE_URL}/${slug}`);

  if (!response.ok)
    throw new Error(`Failed to fetch profile: ${response.status}`);
  return response.json();
}
export default async function Page({ params }) {
  const { slug } = await params;
  const profile = await getProfile(slug);

  return (
    <>
      <div>ID: {profile.id}</div>
      <div>Email: {profile.email}</div>
      <div>Name: {profile.name}</div>
      <div>Gender: {profile.gender}</div>
      <div>Phone: {profile.phone}</div>
    </>
  );
}
