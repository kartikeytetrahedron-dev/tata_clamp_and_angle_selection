import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import colors from "../theme/colors"

interface Props {
  cards: any[]
}

const DropZone: React.FC<Props> = ({ cards }) => {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Drop Zone</Text>

      <View style={styles.grid}>

        {cards.map((card, index) => {

          const correct =
            card.image &&
            card.degree &&
            card.image.degree === card.degree.value

          return (
            <View
              key={index}
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
                  resizeMode="contain"
                />
              )}

              {card.degree && (
                <View style={styles.degreeTag}>
                  <Text style={styles.degreeText}>
                    {card.degree.value} deg
                  </Text>
                </View>
              )}

              {correct && (
                <Text style={styles.correctText}>correct</Text>
              )}

              {card.image && card.degree && !correct && (
                <Text style={styles.wrongText}>wrong!</Text>
              )}

            </View>
          )
        })}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

container:{
flex:1,
borderWidth:2,
borderColor:colors.primary,
borderRadius:16,
padding:12,
backgroundColor:"#111C3A"
},

title:{
color:colors.textPrimary,
marginBottom:12,
fontWeight:"600"
},

grid:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between"
},

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
borderWidth:1,
borderColor:colors.primary,
borderRadius:20,
paddingHorizontal:12,
paddingVertical:4
},

degreeText:{
color:colors.textPrimary
},

correct:{
borderColor:colors.correct
},

wrong:{
borderColor:colors.wrong
},

correctText:{
color:colors.correct,
fontSize:12
},

wrongText:{
color:colors.wrong,
fontSize:12
}

})

export default DropZone