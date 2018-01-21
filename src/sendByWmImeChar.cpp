#define WINVER 0x0601
#include<stdlib.h>
#include<windows.h>
HWND GetGlobalFocus(){
    HWND res=GetFocus();
    if(res)
        return res;
    HWND wnd=GetForegroundWindow();
    if(!wnd)
        return res;
    DWORD tId,pId;
    tId=GetWindowThreadProcessId(wnd,&pId);
    if(!AttachThreadInput(GetCurrentThreadId(),tId,TRUE))
        return res;
    res=GetFocus();
    AttachThreadInput(GetCurrentThreadId(),tId,FALSE);
    return res;
}
void send(int n){
    /*
        WM_CHAR dont' work with MS Office, but it work with Notepad++.
        WM_IME_CHAR dont' work with Notepad++, but it work with MS Office.
    */
    SendMessageW(GetGlobalFocus(),WM_IME_CHAR,n,(LPARAM)1);
}
int main(int argc,char**argv){
    send(atoi(argv[1]));
}