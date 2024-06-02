import "./LoadingSpinner.css";

export const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <div className="loading-spinner__icon">
                <span className="material-symbols-outlined">
                    progress_activity
                </span>
            </div>
        </div>
    );
}