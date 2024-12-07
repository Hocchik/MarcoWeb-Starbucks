

function WhatsappButton({Count}) {

    if(Count>=5){
        return (
        <a href="https://wa.me/1234567890" className="whatsapp-button" target="_blank">
        <img src="https://img.icons8.com/color/48/000000/whatsapp--v1.png" />
    </a>
    )
    }

  return (
    <a href="https://wa.me/1234567890" className="whatsapp-button hidden" target="_blank">
    <img src="https://img.icons8.com/color/48/000000/whatsapp--v1.png" />
    </a>
  )
}

export default WhatsappButton