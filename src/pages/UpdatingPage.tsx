import { useParams } from "react-router-dom";

const UpdatingPage = () => {
  const { serviceId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Page Updating…</h1>
        <p className="text-lg text-muted-foreground">
          The <b>{serviceId}</b> page will be available soon.
        </p>
      </div>
    </div>
  );
};

export default UpdatingPage;
