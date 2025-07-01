import { NematiHeader } from "./NematiHeader"
import { NematiFooter } from "./NematiFooter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NematiDemo() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <NematiHeader />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Nemati AI Navigation Demo</CardTitle>
              <CardDescription>
                This demonstrates both header and footer versions of the Nemati AI navigation component
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">The navigation component includes:</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li>Responsive design that works on mobile and desktop</li>
                  <li>Nemati AI branding with custom logo</li>
                  <li>Navigation links with hover effects</li>
                  <li>Copyright and version information</li>
                  <li>Dark theme matching the original design</li>
                </ul>
                <p className="text-sm text-gray-500 mt-4">
                  You can use either the header or footer version depending on your layout needs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <NematiFooter />
    </div>
  )
}
