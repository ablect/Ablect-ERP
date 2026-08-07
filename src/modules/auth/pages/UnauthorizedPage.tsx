import PageContainer

from "../../../components/ui/PageContainer";

export default function UnauthorizedPage() {

  return (

    <PageContainer>

      <div className="py-24 text-center">

        <h1 className="text-3xl font-bold">

          Access Denied

        </h1>

        <p className="mt-4 text-slate-500">

          You do not have permission

          to access this page.

        </p>

      </div>

    </PageContainer>

  );

}