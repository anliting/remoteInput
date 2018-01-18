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
    SendMessageW(GetGlobalFocus(),WM_CHAR,n,(LPARAM)1);
}
int main(int argc,char**argv){
    Sleep(1000);
    send(atoi(argv[1]));
}