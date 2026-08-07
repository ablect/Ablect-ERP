type Props = {
    title: string;
    subtitle?: string;
}

export default function PageTitle({title, subtitle}:Props){

    return(

        <div style={{marginBottom:30}}>

            <h1>{title}</h1>

            <p>{subtitle}</p>

        </div>

    )

}