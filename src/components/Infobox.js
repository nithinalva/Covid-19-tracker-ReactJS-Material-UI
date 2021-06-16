import React from 'react'
import { Card,CardContent,Typography } from '@material-ui/core'
import numeral from 'numeral'
import '../style/Infobox.css'
export const Infobox = ({title,cases,total,active,...props}) => {
    // console.log(`current button active is ${title}`,active)
    return (
        <Card className={`infobox ${active &&`infobox--active`}`} onClick={props.onClick}>
            
            <CardContent >
                <Typography color="textSecondary" className="infobox__title">{title}</Typography>
                    <h2 className="infobox__cases">{cases===0?cases:`+ ${numeral(cases).format("0.0a")}`}</h2>
                <Typography color="textSecondary" className="infobox__title">{numeral(total).format("0.0a")} Total</Typography>
            </CardContent>

        </Card>
    )
}
