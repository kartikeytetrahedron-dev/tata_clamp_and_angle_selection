import React from "react"
import { Text, StyleSheet, Image } from "react-native"
import Animated,{
useSharedValue,
useAnimatedStyle,
withSpring,
runOnJS
} from "react-native-reanimated"
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import colors from "../theme/colors"

interface Props{
data:any
onDrop:(data:any,x:number,y:number)=>void
onDragStart:(data:any)=>void
onDragMove:(pos:{x:number,y:number})=>void
onDragEnd:()=>void
}

const DraggableItem:React.FC<Props>=({
data,
onDrop,
onDragStart,
onDragMove,
onDragEnd
})=>{

const translateX=useSharedValue(0)
const translateY=useSharedValue(0)

const gesture=Gesture.Pan()
.activateAfterLongPress(120)

.onStart(()=>{
runOnJS(onDragStart)({
id:data.id,
image:data.image ?? null,
label:data.label ?? null,
value:data.value ?? null
})
})

.onUpdate(e=>{
translateX.value=e.translationX
translateY.value=e.translationY

runOnJS(onDragMove)({
x:e.absoluteX,
y:e.absoluteY
})
})

.onEnd(e=>{
runOnJS(onDrop)(data,e.absoluteX,e.absoluteY)
runOnJS(onDragEnd)()

translateX.value=withSpring(0)
translateY.value=withSpring(0)
})

const style=useAnimatedStyle(()=>({
transform:[
{translateX:translateX.value},
{translateY:translateY.value}
]
}))

return(

<GestureDetector gesture={gesture}>
<Animated.View style={[styles.card,style]}>

{data.image && (
<Image
source={data.image}
style={styles.image}
/>
)}

{data.label && (
<Text style={styles.text}>{data.label}</Text>
)}

{data.value && (
<Text style={styles.text}>{data.value} deg</Text>
)}

</Animated.View>
</GestureDetector>

)
}

const styles=StyleSheet.create({

card:{
backgroundColor:colors.card,
borderRadius:14,
padding:10,
marginVertical:8,
alignItems:"center",
borderWidth:1,
borderColor:colors.primary
},

image:{
width:60,
height:60,
marginBottom:8
},

text:{
color:colors.textPrimary,
fontSize:13,
textAlign:"center"
}

})

export default DraggableItem