function Lighting() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />
    </>
  );
}

export default Lighting;
