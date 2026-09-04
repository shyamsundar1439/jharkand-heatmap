import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, Clock, CheckCircle2, Building2, Briefcase, Zap, X } from 'lucide-react';

export const NotificationsModal: React.FC = () => {
  const {
    notifications,
    isNotificationsOpen,
    setIsNotificationsOpen,
    markNotificationRead,
    markAllNotificationsRead,
    navigateTo,
    currentRole,
  } = useApp();

  if (!isNotificationsOpen) return null;

  const filteredNotifications = notifications.filter(
    (n) => n.roleTarget === 'all' || n.roleTarget === currentRole
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'verification':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'assignment':
        return <Building2 className="w-5 h-5 text-blue-500" />;
      case 'collaboration':
        return <Briefcase className="w-5 h-5 text-purple-500" />;
      case 'milestone':
        return <Zap className="w-5 h-5 text-amber-500" />;
      default:
        return <Bell className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/40 backdrop-blur-xs">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in slide-in-from-top-4 duration-200"
        id="notifications-panel"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Notifications</h3>
              <p className="text-xs text-slate-500">Live platform innovation stream</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
              id="mark-all-read-btn"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
              id="close-notifications-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-slate-100 overflow-y-auto flex-1 p-2">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium">No notifications yet</p>
              <p className="text-xs text-slate-400 mt-1">Actions on your challenges & projects will appear here.</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.relatedId?.startsWith('CH-')) {
                    navigateTo('challenge-details', { challengeId: notif.relatedId });
                    setIsNotificationsOpen(false);
                  } else if (notif.relatedId?.startsWith('PRJ-')) {
                    navigateTo('university-project', { projectId: notif.relatedId });
                    setIsNotificationsOpen(false);
                  }
                }}
                className={`p-3.5 rounded-xl transition-all cursor-pointer flex items-start space-x-3 text-left ${
                  notif.read ? 'hover:bg-slate-50 bg-white opacity-80' : 'bg-indigo-50/40 hover:bg-indigo-50/70'
                }`}
                id={`notif-item-${notif.id}`}
              >
                <div className="mt-0.5 shrink-0 p-2 rounded-xl bg-white shadow-xs border border-slate-100">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm ${notif.read ? 'font-medium text-slate-800' : 'font-semibold text-slate-900'}`}>
                      {notif.title}
                    </h4>
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{notif.description}</p>
                  <div className="flex items-center space-x-1.5 mt-2 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{notif.timestamp}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-500">
            Active role: <span className="font-semibold capitalize text-slate-700">{currentRole}</span>. Switch roles in header to see role-specific updates.
          </p>
        </div>
      </div>
    </div>
  );
};
