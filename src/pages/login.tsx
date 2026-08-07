import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Login() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0f172a",
      }}
    >
      <div
        style={{
          width: 420,
          background: "#fff",
          padding: 35,
          borderRadius: 12,
        }}
      >
        <h2>Ablect Business Suite</h2>

        <Input placeholder="Username" />

        <Input
          type="password"
          placeholder="Password"
        />

        <Button text="Login" />
      </div>
    </div>
  );
}