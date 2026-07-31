import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import colors from "../theme/colors"

interface Props{
 index:number
 card:any
 onDrop:(index:number,data:any)=>void
}

const DropCard:React.FC<Props> = ({card})=>{

const correct =
 card.image &&
 card.degree &&
 card.image.degree === card.degree.value

return(

<View
style={[
styles.card,
correct && styles.correct,
card.image && card.degree && !correct && styles.wrong
]}
>

{card.image && (
<Image
source={card.image.image}
style={styles.image}
/>
)}

{card.degree && (
<View style={styles.degreeTag}>
<Text>{card.degree.value} deg</Text>
</View>
)}

{correct && <Text style={styles.correctText}>correct</Text>}
{card.image && card.degree && !correct && (
<Text style={styles.wrongText}>wrong!</Text>
)}

</View>

)
}

const styles=StyleSheet.create({

card:{
width:"48%",
height:140,
borderWidth:2,
borderColor:"#2A355A",
borderRadius:14,
marginBottom:10,
alignItems:"center",
justifyContent:"center"
},

image:{
width:60,
height:60
},

degreeTag:{
marginTop:8,
paddingHorizontal:12,
paddingVertical:4,
borderRadius:20,
borderWidth:1
},

correct:{
borderColor:"green"
},

wrong:{
borderColor:"red"
},

correctText:{
color:"green",
fontSize:12
},

wrongText:{
color:"red",
fontSize:12
}

})

export default DropCard