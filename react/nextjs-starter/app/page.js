import Link from "next/link";

const BASE_URL = "https://6796457bbedc5d43a6c4c20e.mockapi.io/api/v1/profiles";
async function getProfiles() {
  const response = await fetch(BASE_URL);

  if (!response.ok) throw new Error("cannot fetch data");
  return response.json();
}

export default async function ContentPage() {
  const profiles = await getProfiles();

  return (
    <div>
      Profile list :
      {profiles.map((profile, i) => (
        <div key={i}>
          {profile.id} {profile.name}{" "}
          <Link href={`/profile/${profile.id}`} className="px-4 bg-blue-400">
            Go to read profile...
          </Link>
        </div>
      ))}
    </div>
  );
}
