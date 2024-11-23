'use client'

import * as React from 'react'
import { ChevronDown, ClipboardCheck, Code, MessageSquare, RotateCcw, Search, Send, Plus, Minus, FileText, Mail, AlertTriangle, HelpCircle, Scissors, Link, Book, History, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export function SupportSidebar() {
  const [currentProject, setCurrentProject] = React.useState('AWS RDS Issue #1234')
  const [isNotesExpanded, setIsNotesExpanded] = React.useState(true)

  const [userInput, setUserInput] = React.useState('')
  const [aiResponse, setAiResponse] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  
  const recentCases = [
    { id: '1234', title: 'RDS Performance Issue #1234', type: 'RDS' },
    { id: '5678', title: 'EC2 Configuration #5678', type: 'EC2' },
    { id: '9012', title: 'S3 Bucket Policy #9012', type: 'S3' },
  ]

  const quickActions = [
    { icon: FileText, label: 'Summary' },
    { icon: Code, label: 'Code Review' },
    { icon: Mail, label: 'Email Format' },
    { icon: MessageSquare, label: 'Slack Format' },
    { icon: AlertTriangle, label: 'Risk Assessment' },
    { icon: HelpCircle, label: 'Custom Prompt' },
  ]

  const toolbarActions = [
    { icon: ChevronDown, label: 'Menu' },
    { icon: Scissors, label: 'Cut' },
    { icon: Link, label: 'Link' },
    { icon: Book, label: 'Document' },
    { icon: RotateCcw, label: 'Sync' },
    { icon: History, label: 'History' },
    { icon: Plus, label: 'Add' },
  ]

  const handleSubmit = async () => {
    try {
      setIsLoading(true)

      const response = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();
      console.log(data)

      setAiResponse(data.response || 'No response received')
    } catch (error) {
      console.error('Error:', error)
      setAiResponse('Error getting response')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full flex-col bg-slate-950 text-slate-50 lg:flex-row">
      <div className="flex w-full flex-col lg:w-[400px] lg:border-r lg:border-slate-800">
        {/* Project Selector */}
        <div className="border-b border-slate-800 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between bg-slate-900 hover:bg-slate-900/90"
              >
                <span className="truncate">{currentProject}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[380px]">
              {recentCases.map((project) => (
                <DropdownMenuItem
                  key={project.id}
                  onClick={() => setCurrentProject(project.title)}
                >
                  {project.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 p-4">
          <Button
            variant="ghost"
            className="flex h-24 flex-col items-center justify-center gap-2 bg-slate-900 hover:bg-slate-900/90"
          >
            <ClipboardCheck className="h-6 w-6" />
            <span>Summarize</span>
          </Button>
          <Button
            variant="ghost"
            className="flex h-24 flex-col items-center justify-center gap-2 bg-slate-900 hover:bg-slate-900/90"
          >
            <Code className="h-6 w-6" />
            <span>Code Review</span>
          </Button>
          <Button
            variant="ghost"
            className="flex h-24 flex-col items-center justify-center gap-2 bg-slate-900 hover:bg-slate-900/90"
          >
            <Search className="h-6 w-6" />
            <span>Search</span>
          </Button>
          <Button
            variant="ghost"
            className="flex h-24 flex-col items-center justify-center gap-2 bg-slate-900 hover:bg-slate-900/90"
          >
            <Send className="h-6 w-6" />
            <span>Reply</span>
          </Button>
          <Button
            variant="ghost"
            className="flex h-24 flex-col items-center justify-center gap-2 bg-slate-900 hover:bg-slate-900/90"
          >
            <MessageSquare className="h-6 w-6" />
            <span>Chat</span>
          </Button>
          <Button
            variant="ghost"
            className="flex h-24 flex-col items-center justify-center gap-2 bg-slate-900 hover:bg-slate-900/90"
          >
            <RotateCcw className="h-6 w-6" />
            <span>Handoff</span>
          </Button>
        </div>

        {/* Recent Cases */}
        <div className="p-4">
          <h2 className="mb-3 text-sm font-semibold">Recent Cases</h2>
          <ScrollArea className="h-[200px]">
            {recentCases.map((case_) => (
              <Button
                key={case_.id}
                variant="ghost"
                className="mb-2 w-full justify-start bg-slate-900 text-left hover:bg-slate-900/90"
              >
                <div>
                  <div className="font-medium">{case_.title}</div>
                  <div className="text-sm text-slate-400">{case_.type}</div>
                </div>
              </Button>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col p-4">
        {/* Toolbar */}
        <div className="mb-4 flex items-center space-x-2">
          {toolbarActions.map((action, index) => (
            <Button
              key={index}
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-800/90"
              title={action.label}
            >
              <action.icon className="h-4 w-4" />
              <span className="sr-only">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Content and Notes Area */}
        <div className="flex flex-1 gap-4">
          <div className="flex flex-1 flex-col gap-4">
            {/* Content Input */}
            <Textarea
              placeholder="Enter your content..."
              className="flex-1 resize-none bg-slate-900 text-slate-50 placeholder:text-slate-400"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Send'}
              <Send className="ml-2 h-4 w-4" />
            </Button>
            <Textarea 
              placeholder="AI Response..."
              value={aiResponse}
              readOnly
            />

            {/* Collapsible Notes */}
            <Collapsible open={isNotesExpanded} onOpenChange={setIsNotesExpanded}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Notes</span>
                <CollapsibleTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                    {isNotesExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle notes</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <Textarea
                  placeholder="Take notes..."
                  className="mt-2 min-h-[100px] resize-none bg-slate-900 text-slate-50 placeholder:text-slate-400"
                />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Quick Actions Menu */}
          <ScrollArea className="w-12">
            <div className="flex flex-col items-center space-y-2 py-1">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 rounded-full bg-slate-800 hover:bg-slate-800/90"
                  title={action.label}
                >
                  <action.icon className="h-5 w-5" />
                  <span className="sr-only">{action.label}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}