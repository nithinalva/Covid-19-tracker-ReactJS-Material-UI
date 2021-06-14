import React from 'react'
import { Card,CardContent,Typography } from '@material-ui/core'
export const Infobox = ({title,cases,total}) => {
    return (
        <Card>
            <CardContent className="infobox">
                <Typography color="textSecondary" className="infobox__title">{title}</Typography>
                    <h2 className="infobox__cases">{cases===0?cases:`+ ${cases}`}</h2>
                <Typography color="textSecondary" className="infobox__title">{total} Total</Typography>
            </CardContent>

        </Card>
    )
}
