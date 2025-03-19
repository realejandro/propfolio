// Need to handle the file with spaces in its name
const videoUrl = new URL('../assets/animated/Woman Buying Real Estate.mp4', import.meta.url).href
// Add background image
const backgroundUrl = new URL('../assets/backgrounds/03.jpg', import.meta.url).href

export const Hero = () => {
  return (
    <div style={{
      width: '100%',
      paddingTop: '120px',
      paddingBottom: '80px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.55)), url(${backgroundUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        padding: '0 40px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          width: '50%',
          maxWidth: '560px',
          paddingRight: '40px'
        }}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '24px',
            color: '#fff'
          }}>
            Find Your Chicago Home
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: '#eee',
            marginBottom: '40px',
            lineHeight: 1.6
          }}>
            Browse our diverse property portfolio ranging from affordable $180k starter homes to $2.2M luxury estates throughout Chicago. Quality homes for every budget and lifestyle.
          </p>
          
          <div>
            <div style={{
              display: 'flex',
              marginBottom: '8px',
              gap: '10px'
            }}>
              <input
                placeholder="Enter your email"
                style={{
                  height: '56px',
                  padding: '0 16px',
                  fontSize: '16px',
                  flex: 3,
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}
              />
              <button style={{
                height: '56px',
                padding: '0 24px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '16px',
                flex: 1,
                cursor: 'pointer'
              }}>
                Get Updates
              </button>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#ccc'
            }}>
              By signing up, you accept our Terms and Conditions.
            </p>
          </div>
        </div>
        
        <div style={{
          width: '50%',
          maxWidth: '560px',
          height: '480px',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
} 