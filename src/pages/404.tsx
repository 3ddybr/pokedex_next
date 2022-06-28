import Image from "next/image"

export default function NotFound(){
  return(
    <div>
      <h1>404</h1>
      <Image
        src="/images/team_rocket_trio.png"
        alt="404"
        width={500}
        height={500}
      />
      <h2>Página não encontrada</h2>
    </div>
  )
}