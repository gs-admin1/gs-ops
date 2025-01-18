import { ChevronDown, ClipboardCheck, Code, MessageSquare, RotateCcw, Search, Send, Plus, FileText, Mail, AlertTriangle, HelpCircle, Scissors, Link, Book, History, ChevronUp, SquareUserRound } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ScrollArea } from './ui/scroll-area'
import { Textarea } from './ui/textarea'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
//import { groqChat } from '@/api/groq'
import { openAiChat } from '@/api/openai'
//import { claudeChat } from '@/api/claude'
import { openAiAssistant } from '@/api/openaiassistant'
import { useState } from 'react'
import UserLogin from './UserLogin'
import MeetDialog from './MeetDialog'

// adding comment to track changes on commit
// adding second comment for separate branch creation and pull request

export default function SupportSidebar() {
  const [currentProject, setCurrentProject] = useState('Your current project will show here')
  const [isNotesExpanded, setIsNotesExpanded] = useState(true)

  //const [openDialog, setOpenDialog] = useState(false);

  const [userInput, setUserInput] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
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
      setAiResponse('')
      //chrome.runtime.sendMessage({ type: 'THREAD', content: 'Empty' });

      // chrome.storage.local.set({ key: "thread_R2hGv6NXESlxzM5IUsQtB8p7" }).then(() => {
      //   console.log("Thread is set");
      // });
      
      // chrome.storage.local.get(["key"]).then((result) => {
      //   console.log("Thread is retrieved: " + result.key);
      // });

      //const data = await groqChat(userInput)
      //const data = await openAiChat(userInput)
      //const data = await openAiAssistant(userInput)
      //const data = await claudeChat(userInput)
      // const samp = {type: 'text', text: 'Here are a few different ways to print numbers fro…he range of numbers or add additional operations.'};
      // console.log(JSON.stringify(samp));

      // console.log('data: ', data);
      // const aiResponse = data[0].content[0]?.text.value;

      // setAiResponse(aiResponse || 'No response')
      //setAiResponse(data || 'No response')

      let title = 'create a title for the following query (respond with only the title and nothing else): ';
      const getTitle = await openAiChat(title+=userInput);
      console.log('getTitle: ', getTitle);
      setCurrentProject(getTitle || 'No title');

      let response = '';
      const data = openAiAssistant(userInput)
      for await (const res of data) {
        if (res !== undefined) {
          console.log('Received response:', res);
          response += res;
          console.log('Response:', response);
          setAiResponse(response || 'No response');
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setAiResponse('Error getting response')
    } finally {
      setIsLoading(false)
    }
  }

  const summarize = async () => {
    const prompt = 'Summarize the following page content: ';
    chrome.runtime.sendMessage({ type: 'GET_PAGE_CONTENT' }, response => {
      setUserInput(prompt.concat(response.content));
    });
    console.log(userInput)
    handleSubmit()
  }

  const login = () => {
    //setOpenDialog(true);
  }

  return (
    <div className="flex h-max w-full min-w-fit flex-col bg-slate-950 text-slate-50 overflow-hidden">
      <div className='max-w-7xl mx-auto flex flex-col flex-1 border border-slate-800 my-1 overflow-hidden'>
      {/* Project Selector */}
      <div className="border-b border-slate-800 p-2 flex items-center justify-between mx-2">
        <div className='flex items-center justify-between gap-1'>
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
        <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-800/90 flex-shrink-0"
        title="Add Project">
          <Plus className="h-6 w-6" />
        </Button>  
        </div>
        <div className='flex items-center justify-between gap-2'>
          <UserLogin />
          <SquareUserRound className="h-10 w-10" />
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <Button
          onClick={summarize}
          variant="ghost"
          className="flex h-24 flex-col items-center justify-center gap-2 bg-slate-900 hover:bg-slate-900/90"
        >
          <ClipboardCheck className="h-6 w-6" />
          <span>Summarize</span>
        </Button>
        <Button
          onClick={login}
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
      </div>

      {/* <Button
          variant="ghost"
          className="m-4 flex h-24 flex-col items-center justify-center gap-2 bg-slate-900 hover:bg-slate-900/90"
        >
          <Presentation className="h-6 w-6" />
          <span>Join Meeting</span>
      </Button> */}
      
      <div className="flex h-24 flex-col items-center justify-center gap-2">
        <MeetDialog />
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

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 p-4 overflow-hidden">
        {/* Toolbar */}
        <div className="mb-4 flex items-center space-x-2 overflow-x-auto pb-2">
          {toolbarActions.map((action, index) => (
            <Button
              key={index}
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-800/90 flex-shrink-0"
              title={action.label}
            >
              <action.icon className="h-4 w-4" />
              <span className="sr-only">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Content and Notes Area */}
        <div className="flex flex-col flex-1 gap-4 overflow-hidden">
          <div className="flex-1 min-h-0 flex">
            {/* Content Input */}
            <Textarea
              placeholder="Enter your content..."
              className="flex-1 resize-none bg-slate-900 text-slate-50 placeholder:text-slate-400"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />

            {/* Quick Actions Menu */}
            <ScrollArea className="w-12 ml-4">
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

          <Button 
              onClick={handleSubmit}
              disabled={isLoading}
              className='flex items-center justify-center  bg-slate-800 hover:bg-slate-800/90 text-white'
            >
              {isLoading ? 'Processing...' : 'Send'}
              <Send className="ml-2 h-4 w-4" />
            </Button>

            <Textarea 
              className="flex-1 resize-none bg-slate-900 text-slate-50 placeholder:text-slate-400"
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
      </div>
      </div>
    </div>
  )
}
