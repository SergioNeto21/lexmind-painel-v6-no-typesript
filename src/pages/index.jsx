import { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export default function Dashboard() {
  const [caseData, setCaseData] = useState({
    client: '',
    case_type: '',
    status: '',
    deadline: '',
    details: ''
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setCaseData({ ...caseData, [field]: value });
  };

  const generatePetition = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://gitrepo-production.up.railway.app/generate-petition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(caseData)
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Erro ao gerar petição:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-800 text-white p-6 space-y-6">
        <div className="text-xl font-bold">LexMind</div>
        <nav className="space-y-4">
          <div className="font-semibold">📩 Dashboard</div>
          <div className="opacity-80">📁 Minhas Petições</div>
          <div className="opacity-80">📊 Relatórios</div>
          <div className="opacity-80">👤 Perfil</div>
        </nav>
      </aside>
      <main className="flex-1 bg-blue-50 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Fill in Case Data</h2>
            <Input placeholder="Client" onChange={(e) => handleChange('client', e.target.value)} />
            <Input placeholder="Case Type" onChange={(e) => handleChange('case_type', e.target.value)} />
            <Select onValueChange={(v) => handleChange('status', v)}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" onChange={(e) => handleChange('deadline', e.target.value)} />
            <Textarea placeholder="Case Details" onChange={(e) => handleChange('details', e.target.value)} />
            <Button onClick={generatePetition} disabled={loading} className="bg-blue-600 text-white hover:bg-blue-700">
              {loading ? "Generating..." : "Generate Petition"}
            </Button>
          </CardContent>
        </Card>

        {response && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">📄 Petition</h2>
                <p className="whitespace-pre-wrap bg-white p-4 rounded border">{response.petition}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">📊 Case Report</h2>
                <p className="whitespace-pre-wrap bg-white p-4 rounded border">{response.report}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">💡 Legal Insights</h2>
                <ul className="list-disc pl-5 bg-white p-4 rounded border">
                  {response.insights.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}