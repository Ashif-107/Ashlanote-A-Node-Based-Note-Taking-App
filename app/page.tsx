import Link from "next/link";

export default function page(){
  return(
    <div>
      <h1>Welcome to Ashlanote</h1>
      <Link href='/home'>Go to Home</Link>
    </div>
  )
}