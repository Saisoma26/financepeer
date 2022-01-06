import Header from '../Header'

import './index.css'

const Home = () => {
  const fileuploaded = event => {
    const files1 = event.target.files
    const handleFiles = () => {
      const reader = new FileReader()
      reader.onload = function (e) {
        console.log(reader.result)
      }
      reader.readAsText(files1[0])
    }
    const url = 'https://apis.ccbp.in/books'
    const options = {
      method: 'POST',
      body: JSON.stringify(handleFiles),
    }
    const response = fetch(url, options)
    console.log(response.ok)
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Welcome!</h1>
          <p className="home-description">You can upload the file here.</p>
          <input
            className="inputelement"
            type="file"
            name="file"
            id="uploadfile"
            onChange={fileuploaded}
          />
          <label className="label" htmlFor="uploadfile">
            Upload
          </label>
        </div>
        <img
          src="https://res.cloudinary.com/dekggtreb/image/upload/v1641396426/WhatsApp_Image_2022-01-05_at_17.54.08_um1nii.jpg"
          alt="clothes that get you noticed"
          className="home-desktop-img"
        />
      </div>
    </>
  )
}

export default Home
